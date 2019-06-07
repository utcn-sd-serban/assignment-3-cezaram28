package com.cezaram28.Assignment1.event;

import com.cezaram28.Assignment1.dto.AnswerDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AnswerDeletedEvent extends BaseEvent {
    private final AnswerDTO answerDTO;

    public AnswerDeletedEvent(AnswerDTO answerDTO) {
        super(EventType.ANSWER_DELETED);
        this.answerDTO = answerDTO;
    }
}
